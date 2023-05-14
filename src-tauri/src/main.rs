// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Additional imports
use enigo::{Enigo, Key, KeyboardControllable};
// use tauri::Command;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Deserialize)]
struct KeyboardInput {
    text: String,
}

#[tauri::command]
fn simulate_keyboard_input(input: KeyboardInput) {
    let mut enigo = Enigo::new();
    // log input
    println!("Input: {}", input.text);



    // Press modifier keys, example: Ctrl+Shift
    enigo.key_down(Key::Control);
    enigo.key_down(Key::Shift);

    // Type the text
    for c in input.text.chars() {
        enigo.key_sequence(&c.to_string());
    }

    // Release modifier keys
    enigo.key_up(Key::Shift);
    enigo.key_up(Key::Control);
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
