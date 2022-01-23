pub trait Outcome {}

pub trait Model<D, R, O>
where
    D: EndpointDbConnection,
    O: Outcome,
{
    fn model(&self, db_connection: &D, submitted_data: &R)
        -> Result<O, Box<dyn std::error::Error>>;
}

pub trait Endpoint {}

pub trait EndpointDbConnection {}

pub trait Name {
    fn name(&self) -> &'static str;
}

pub trait View<O>
where
    O: Outcome,
{
    fn view(&self, result: Result<O, Box<dyn std::error::Error>>) -> tide::Result;
}

pub trait Presenter<T, D, R, O>
where
    T: Endpoint + Name + Model<D, R, O> + View<O>,
    D: EndpointDbConnection,
    O: Outcome,
{
    fn presenter(endpoint: T, db_connection: &D, submitted_data: &R) -> tide::Result {
        let endpoint_result = endpoint.view(endpoint.model(db_connection, submitted_data));
        endpoint_result
    }
}
