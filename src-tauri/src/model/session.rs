pub struct SessionInfo<'session_name> {
    pub name: &'session_name SessionName,
    pub path: SessionPath,
}

pub struct SessionName(String);

impl AsRef<str> for SessionName {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

impl From<String> for SessionName {
    fn from(value: String) -> Self {
        Self(value)
    }
}

impl From<SessionName> for String {
    fn from(value: SessionName) -> String {
        value.0
    }
}

pub struct SessionPath(String);

impl From<String> for SessionPath {
    fn from(value: String) -> Self {
        Self(value)
    }
}

impl From<SessionPath> for String {
    fn from(value: SessionPath) -> String {
        value.0
    }
}
