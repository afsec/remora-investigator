pub trait App {
    fn name(&self) -> &'static str;

    fn version(&self) -> &'static str;
}
