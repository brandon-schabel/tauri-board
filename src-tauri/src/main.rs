// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Additional imports
use enigo::{Enigo, Key, KeyboardControllable, MouseButton, MouseControllable};
// use tauri::Command;

#[tauri::command]
fn greet(name: &str) -> String {
    println!("Hello, {}!", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Deserialize)]
struct KeyboardInput {
    text: String,
}

#[tauri::command]
fn simulate_keyboard_input(text: &str) {
    // log input
    println!("Input: {}", text);

    let mut enigo = Enigo::new();

    enigo.mouse_move_to(500, 200);
    enigo.mouse_click(MouseButton::Left);
    enigo.key_sequence_parse("{+CTRL}a{-CTRL}{+SHIFT}Hello World{-SHIFT}");
    // enigo.key_sequence_parse("{+Command}A{-Command}{+Command}C{-Command}");

    enigo.key_down(Key::Meta);
    enigo.key_down(Key::Meta);
    enigo.key_up(Key::Meta);



    // let mut enigo = Enigo::new();

    // // Press modifier keys, example: Ctrl+ShiftaHELLO WORLD
    // enigo.key_down(Key::Control);
    // enigo.key_down(Key::Shift);

    // // Type the text
    // for c in input.text.chars() {
    //     enigo.key_sequence(&c.to_string());
    // }

    // // Release modifier keys
    // enigo.key_up(Key::Shift);
    // enigo.key_up(Key::Control);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            simulate_keyboard_input // Add this line
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
