use crossterm::{execute,terminal::{Clear,ClearType}};
use std::{io,fs,path::Path};
pub fn clear_screen(){
    let mut stdout=io::stdout();
    execute!(stdout,Clear(ClearType::All)).unwrap();
}
pub enum ContentType{
    Plain,
    Json,
}
pub fn request_data(message:&str)->String{
    println!("{}",message);
    let mut value= String::new();
    io::stdin()
        .read_line(&mut value)
        .expect("Failed to read the ip");
    value.trim().to_string()
}

pub fn curl(url:&String,method:&String,content_type:ContentType,data:&Option<String>,output_file:&Option<String>){
    let mut command=std::process::Command::new("curl");
    command.arg("-X").arg(method).arg(url);
    match content_type{
        ContentType::Json=>{
            command.arg("-H").arg("Content-Type: application/json");
        }
        ContentType::Plain=>{}
    }
    if let Some(data_str)=data{
        command.arg("--data").arg(data_str);
    }
    if let Some(output_str)=output_file{
        let output=format!("audios/{}",output_str);
        command.arg("-o").arg(output);
    }
    let status=command.status().expect("Failed to execute the command");
    println!("Exited with code: {}",status);
}
