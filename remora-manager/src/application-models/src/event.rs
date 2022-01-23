use std::convert::{TryFrom, TryInto};

use rusqlite::Error as RusqliteError;
use serde::{Deserialize, Serialize};

// * Error Handling
#[derive(Debug)]
pub struct EventError(String);

impl EventError {
    pub fn new(msg: String) -> EventError {
        Self(msg)
    }
}
impl std::fmt::Display for EventError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0.to_string())
    }
}
impl std::error::Error for EventError {}

// * Fields

#[derive(Debug, Serialize, Deserialize)]
pub struct EventId(u16);
impl EventId {
    pub fn new(data: u16) -> Self {
        Self(data)
    }
    pub fn get(&self) -> u16 {
        self.0
    }
}

// Event metadata
#[derive(Debug, Serialize, Deserialize)]
pub struct EventSecurityState(Option<String>);
impl EventSecurityState {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventDestinationPort(Option<i32>);
impl EventDestinationPort {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventServerIPAddress(Option<String>);
impl EventServerIPAddress {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventStartedDateTime(Option<String>);
impl EventStartedDateTime {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventRtt(Option<i32>);
impl EventRtt {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}

// Request
#[derive(Debug, Serialize, Deserialize)]
pub struct RequestMethod(Option<String>);
impl RequestMethod {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestUrl(Option<String>);
impl RequestUrl {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestHttpVersion(Option<String>);
impl RequestHttpVersion {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestQueryString(Option<String>);
impl RequestQueryString {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestHeadersSize(Option<i32>);
impl RequestHeadersSize {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestHeaders(Vec<HttpHeader>);
impl RequestHeaders {
    pub fn new(data: HttpHeader) -> Self {
        Self(vec![data])
    }
    pub fn get<'a>(&'a self) -> &'a Vec<HttpHeader> {
        &self.0
    }
}

impl TryFrom<String> for RequestHeaders {
    type Error = Box<dyn std::error::Error>;

    fn try_from(data: String) -> Result<Self, Self::Error> {
        match serde_json::from_str(&data) {
            Ok(deserialized) => Ok(deserialized),
            Err(serde_error) => Err(Box::new(EventError::new(serde_error.to_string()))),
        }
    }
}

impl TryInto<String> for &RequestHeaders {
    type Error = EventError;

    fn try_into(self) -> Result<String, Self::Error> {
        match serde_json::to_string(&self) {
            Ok(deserialized) => Ok(deserialized),
            Err(serde_error) => Err(EventError::new(serde_error.to_string())),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HttpHeader {
    name: String,
    value: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestCookies(Option<String>);
impl RequestCookies {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestBodySize(Option<i32>);
impl RequestBodySize {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestPostDataMimeType(Option<String>);
impl RequestPostDataMimeType {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestPostDataParams(Option<String>);
impl RequestPostDataParams {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestPostDataText(Option<String>);
impl RequestPostDataText {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn new_preview<'a>(input: &'a Option<String>) -> Self {
        let preview_data: String = match input {
            Some(data) => {
                let max_size = 1048576; // 1 MiB
                let data_len = data.len();
                if data_len > max_size {
                    String::from(&data[..max_size])
                } else {
                    String::from(&data[..data_len])
                }
            }
            None => "".to_string(),
        };
        Self(Some(preview_data))
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

// Response

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseHttpVersion(Option<String>);
impl ResponseHttpVersion {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseStatusCode(Option<i32>);
impl ResponseStatusCode {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseHeadersSize(Option<i32>);
impl ResponseHeadersSize {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseHeaders(Vec<HttpHeader>);
impl ResponseHeaders {
    pub fn new(data: HttpHeader) -> Self {
        Self(vec![data])
    }
    pub fn get<'a>(&'a self) -> &'a Vec<HttpHeader> {
        &self.0
    }
}

impl TryFrom<String> for ResponseHeaders {
    type Error = Box<dyn std::error::Error>;

    fn try_from(data: String) -> Result<Self, Self::Error> {
        match serde_json::from_str(&data) {
            Ok(deserialized) => Ok(deserialized),
            Err(serde_error) => Err(Box::new(EventError::new(serde_error.to_string()))),
        }
    }
}

impl TryInto<String> for &ResponseHeaders {
    type Error = EventError;

    fn try_into(self) -> Result<String, Self::Error> {
        match serde_json::to_string(&self) {
            Ok(deserialized) => Ok(deserialized),
            Err(serde_error) => Err(EventError::new(serde_error.to_string())),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseRedirectUrl(Option<String>);
impl ResponseRedirectUrl {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseCookies(Option<String>);
impl ResponseCookies {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseContentMimeType(Option<String>);
impl ResponseContentMimeType {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseContentSize(Option<i32>);
impl ResponseContentSize {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseBodySize(Option<i32>);
impl ResponseBodySize {
    pub fn new(data: Option<i32>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> Option<i32> {
        self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseBodyEncoding(Option<String>);
impl ResponseBodyEncoding {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponseBodyContent(Option<String>);
impl ResponseBodyContent {
    pub fn new(data: Option<String>) -> Self {
        Self(data)
    }
    pub fn new_preview<'a>(input: &'a Option<String>) -> Self {
        let preview_data: String = match input {
            Some(data) => {
                let max_size = 1048576; // 1 MiB
                let data_len = data.len();
                if data_len > max_size {
                    String::from(&data[..max_size])
                } else {
                    String::from(&data[..data_len])
                }
            }
            None => "".to_string(),
        };
        Self(Some(preview_data))
    }
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NoteId(Option<u16>);
impl NoteId {
    pub fn new(data: Option<u16>) -> Self {
        Self(data)
    }
    pub fn get(&self) -> &Option<u16> {
        &self.0
    }
}

pub fn convert_error_from_result_note<T>(
    result: Result<T, Box<dyn std::error::Error>>,
) -> Result<T, RusqliteError> {
    match result {
        Ok(data) => Ok(data),
        Err(error) => {
            log::error!("Data validation from DB: {}", error.to_string());
            let r_error = RusqliteError::ExecuteReturnedResults;
            Err(r_error)
        }
    }
}

pub fn convert_error_from_result_event<T>(
    result: Result<T, Box<dyn std::error::Error>>,
) -> Result<T, RusqliteError> {
    match result {
        Ok(data) => Ok(data),
        Err(error) => {
            log::error!("Data validation from DB: {}", error.to_string());
            Err(RusqliteError::ExecuteReturnedResults)
        }
    }
}
