pub fn get_routes() -> tide::Server<()> {
    let mut api = tide::new();

    api.at("/favicon.ico").get(frontend::favicon);

    api.at("/").get(frontend::index_page);

    api.at("/js/main.js").get(frontend::main_js);

    api.at("/css/style.css").get(frontend::style_css);

    api.at("/css/uikit.min.css").get(frontend::uikit_css);

    api.at("/js/uikit-icons.min.js")
        .get(frontend::uikit_icons_min_js);

    api.at("/js/uikit.min.js").get(frontend::uikit_js);

    api
}
