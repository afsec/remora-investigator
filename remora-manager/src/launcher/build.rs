use std::io;
use std::path::PathBuf;
fn main() -> io::Result<()> {
    let endpoints = get_endpoint_modules()?;
    check_endpoints(&endpoints)?;
    generate_endpoints_found(endpoints)?;
    Ok(())
}

fn generate_endpoints_found(endpoints: Vec<PathBuf>) -> io::Result<()> {
    use regex::Regex;
    use std::fs::File;
    use std::io::BufRead;
    use std::io::Write;
    use std::path::Path;
    let base_path = env!("CARGO_MANIFEST_DIR");
    let output_file_path = Path::new(base_path).join("endpoints_found.txt");
    dbg!(&output_file_path);
    let mut output_file_fd = File::create(&output_file_path)?;
    let re = Regex::new(r"pub struct (\w+);").unwrap();
    for endpoint in endpoints {
        let filename = endpoint.join("mod.rs");

        let file = File::open(filename)?;
        let lines = io::BufReader::new(file).lines();
        for line in lines {
            if let Ok(value) = line {
                let line_str = value.as_str();

                for cap in re.captures_iter(line_str) {
                    let endpoint_str = endpoint.as_os_str().to_str().unwrap_or("");
                    let endpoint_vec = endpoint_str.split("/").collect::<Vec<&str>>();
                    let endpoint_name = endpoint_vec.last().unwrap().to_string();
                    let endpoint_str_line = format!("    /api/{} - {}\n", endpoint_name, &cap[1]);
                    output_file_fd.write_all(endpoint_str_line.as_bytes())?;
                }
            }
        }
    }
    Ok(())
}

fn get_endpoint_modules() -> io::Result<Vec<PathBuf>> {
    use std::fs::read_dir;
    use std::path::Path;
    let base_path = env!("CARGO_MANIFEST_DIR");
    let dispatcher_file_path = Path::new(base_path)
        .join("../application-endpoints")
        .join("src/endpoints");
    dbg!(&dispatcher_file_path);
    let mut endpoints: Vec<PathBuf> = Vec::new();
    read_dir(dispatcher_file_path)?
        .map(|res| {
            res.map(|e| {
                if e.path().is_dir() {
                    endpoints.push(e.path())
                }
            })
        })
        .collect::<Result<Vec<_>, io::Error>>()?;
    endpoints.sort();
    Ok(endpoints)
}

fn check_endpoints(endpoints: &Vec<PathBuf>) -> io::Result<()> {
    // drop(endpoints);
    let endpoints_from_dispatcher = get_endpoints_from_dispatcher();
    let endpoints_from_modules = get_endpoints_from_modules(endpoints);
    // Check modules -> dispatcher

    for endpoint in &endpoints_from_modules {
        if !endpoints_from_dispatcher.contains(&endpoint) {
            panic!("ERROR: Endpoint not found on dispatcher: [{}]", endpoint);
        }
    }

    // Check dispatcher -> modules
    for endpoint in &endpoints_from_dispatcher {
        if !endpoints_from_modules.contains(&endpoint) {
            panic!(
                "ERROR: Endpoint not found on ./application-model/src/endpoints: [{}]",
                endpoint
            );
        }
    }
    Ok(())
}

fn get_endpoints_from_dispatcher() -> Vec<String> {
    use regex::Regex;
    use std::fs::File;
    use std::io::BufRead;
    // use std::io::Write;
    use std::path::Path;
    let base_path = env!("CARGO_MANIFEST_DIR");
    let dispatcher_file_path = Path::new(base_path)
        .join("../application-endpoints")
        .join("src/dispatcher.rs");
    // panic!("DISPATCHER FOUND: {:?}", dispatcher_file_path.to_str());
    let input_file_fd = File::open(&dispatcher_file_path).unwrap();

    let re = Regex::new("\"(\\w+)\" =>").unwrap();
    let mut endpoints_from_dispatcher: Vec<String> = Vec::new();
    for line in io::BufReader::new(input_file_fd).lines() {
        if let Ok(value) = line {
            let line_str = value.as_str();
            for cap in re.captures_iter(line_str) {
                endpoints_from_dispatcher.push(cap[1].to_string());
            }
        }
    }
    endpoints_from_dispatcher
}

fn get_endpoints_from_modules(endpoints: &Vec<PathBuf>) -> Vec<String> {
    let mut endpoints_result: Vec<String> = Vec::new();
    for endpoint in endpoints {
        let endpoint_from_module_name_str = endpoint.to_str().unwrap_or("");
        let endpoint_from_module_name_vec = endpoint_from_module_name_str
            .split("/")
            .collect::<Vec<&str>>();
        let endpoint_from_module_name = endpoint_from_module_name_vec.last().unwrap().to_string();
        endpoints_result.push(endpoint_from_module_name);
    }
    endpoints_result
}
