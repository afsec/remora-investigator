use crate::event::EventId;
use rusqlite::Error as RusqliteError;
use serde::{Deserialize, Serialize};
use std::convert::{TryFrom, TryInto};

#[derive(Debug)]
pub struct NoteError(String);

impl NoteError {
    pub fn new(msg: String) -> NoteError {
        Self(msg)
    }
}
impl std::fmt::Display for NoteError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0.to_string())
    }
}
impl std::error::Error for NoteError {}

// * Field: `id`

#[derive(Debug, Serialize, Deserialize)]
pub struct NoteId(u16);
impl NoteId {
    pub fn new(data: u16) -> Result<Self, Box<dyn std::error::Error>> {
        Ok(Self(data).validate()?)
    }
    fn validate(self) -> Result<Self, Box<dyn std::error::Error>> {
        if self.0 > 0 {
            Ok(self)
        } else {
            let error = NoteError::new(self.to_string());
            Err(Box::new(error))
        }
    }
    pub fn get(&self) -> u16 {
        self.0
    }
}

impl TryFrom<i64> for NoteId {
    type Error = Box<dyn std::error::Error>;

    fn try_from(value: i64) -> Result<Self, Self::Error> {
        Ok(Self::new(value.try_into()?)?)
    }
}

impl ToString for NoteId {
    fn to_string(&self) -> String {
        self.0.to_string()
    }
}

// * Field: `event_id`
pub type NoteEventId = EventId;

// * Field: `note_content`
#[derive(Debug, Serialize, Deserialize)]
pub struct NoteContent(String);
impl NoteContent {
    pub fn new(data: String) -> Result<Self, Box<dyn std::error::Error>> {
        Ok(Self(data).validate()?)
    }
    fn validate(self) -> Result<Self, Box<dyn std::error::Error>> {
        if self.0.len() > 4 {
            Ok(self)
        } else {
            let error = NoteError::new(self.to_string());
            Err(Box::new(error))
        }
    }
    // TODO: Implement a trait called something like `SerdeExpectMsg`
    pub fn expect_msg() -> &'static str {
        "a string with more than 4 characters"
    }

    pub fn get<'a>(&'a self) -> &String {
        &self.0
    }
}

impl std::fmt::Display for NoteContent {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0.to_string())
    }
}

// * Field: `created_at`
#[derive(Default, Debug, Serialize, Deserialize)]
pub struct NoteCreatedAt(i32);
impl NoteCreatedAt {
    pub fn new(data: i32) -> Result<Self, Box<dyn std::error::Error>> {
        Ok(Self(data).validate()?)
    }
    fn validate(self) -> Result<Self, Box<dyn std::error::Error>> {
        if self.0 > 0 {
            Ok(self)
        } else {
            // TODO: Validation error enum.
            let error = NoteError::new(format!("Error on validate {}", self.to_string()));
            Err(Box::new(error))
        }
    }
    pub fn get(&self) -> i32 {
        self.0
    }
}

impl std::fmt::Display for NoteCreatedAt {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0.to_string())
    }
}

// * Field: `updated_at`

#[derive(Default, Debug, Serialize, Deserialize)]
pub struct NoteUpdatedAt(i32);
impl NoteUpdatedAt {
    pub fn new(data: i32) -> Result<Self, Box<dyn std::error::Error>> {
        Ok(Self(data).validate()?)
    }
    fn validate(self) -> Result<Self, Box<dyn std::error::Error>> {
        if self.0 > 0 {
            Ok(self)
        } else {
            // TODO: Validation error enum.
            let error = NoteError::new(format!("Error on validate {}", self.to_string()));
            Err(Box::new(error))
        }
    }
    pub fn get(&self) -> i32 {
        self.0
    }
}

impl std::fmt::Display for NoteUpdatedAt {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0.to_string())
    }
}

pub fn convert_error_from_result_note<T>(
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
