use std::env;
use reqwest::blocking::get;
use std::process;

fn main() {
    let args: Vec<String> =env::args().collect();
    if args.len()<2 {
        eprintln!("Uso: {} <URL>",args[0]);
        process::exit(1);
    }
    let url=&args[1];
    match get(url){
        Ok(resp)=>{
            let text=resp.text().unwrap_or_else(|_| "Error leyendo respuesta".to_string());
            println!("{}", text);

        }
         Err(err) => eprintln!("Error al hacer request: {}", err),
    
    }
}
