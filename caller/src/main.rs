mod terminal;
mod menu;
mod actions
fn main(){
    terminal::clear_screen();
    let optiones=vec!["Hello message".white().bold(),
                                        "Create".green().bold(),
                                        "Read".yellow().bold(),
                                        "Update".blue().bold(),
                                        "Delete".red().bold()];
    loop{
        let selection=menu::main_menu(&options);
        match selection{
            0=>actions::run_welcome(),
            1=>actions::run_create(),
            2=>actions::run_read(),
            3=>actions::run_update(),
            4=>actions::run_delete(),
            _=>{
                println!("{}","Goodbye!".read());
                break;
            }
        }
    }
}
