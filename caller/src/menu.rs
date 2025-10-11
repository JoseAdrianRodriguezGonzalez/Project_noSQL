use colored::*;
use dialoguer::{theme::ColorfulTheme,Select};

pub fn main_menu(options:&Vec<ColoredString>)->usize {
    //The list
    Select::with_theme(&ColorfulTheme::default())//Adds a theme 
    .with_prompt(("Choose an action".yellow()).to_string())//Text before it appears
    .items(&options)// We pass a list of options
    .default(0)//DDefines the value fo the first elment and so on
    .interact() //Allows the user move on the console with arrows and enter
    .unwrap() //This is for identify if it is running on CLI    
}
