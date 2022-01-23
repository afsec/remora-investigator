#[derive(Debug)]
pub struct MvpError(String);
impl MvpError {
    pub fn new(msg: String) -> Self {
        MvpError(msg)
    }
}

impl std::fmt::Display for MvpError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0.to_string())
    }
}

impl std::error::Error for MvpError {}
