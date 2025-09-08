# 🚀 Basic Terminal for Web Development

## 📌 Objective
This guide introduces the essential terminal commands for navigating, managing files, and executing processes on Unix-based systems (Linux/macOS) and Windows.

---

## 1️⃣ Understanding the Terminal
The **terminal** (or command line) allows direct interaction with the operating system.

- **Opening the Terminal:**
  - macOS: Press `Cmd + Space`, type **"Terminal"**, and open it.
  - Linux: Use **Ctrl + Alt + T** or search for **"Terminal"**.
  - Windows: Open **Command Prompt** (`cmd`) by searching "Command Prompt" in the Start menu or use **PowerShell**.
  - Windows (WSL): Install **Windows Subsystem for Linux (WSL)** and open Ubuntu.

---

## 2️⃣ Basic Navigation Commands

| OS | Command | Description |
|----|---------|------------|
| Unix/Linux/macOS | `pwd` | Print current working directory |
| Windows | `cd` | Print current working directory |
| Unix/Linux/macOS/Windows | `ls` (Mac/Linux) / `dir` (Windows) | List files and folders in the current directory |
| Unix/Linux/macOS/Windows | `cd folder_name` | Change directory into `folder_name` |
| Unix/Linux/macOS/Windows | `cd ..` | Move up one directory |
| Unix/Linux/macOS | `cd /` | Go to the root directory |
| Windows | `cd C:\` | Go to the root directory |
| Unix/Linux/macOS/Windows | `clear` (Mac/Linux) / `cls` (Windows) | Clear the terminal screen |

**Example:**
```sh
cd ~/Documents/Projects  # macOS/Linux
cd C:\Users\MyUser\Documents  # Windows
ls  # macOS/Linux
dir  # Windows
```

---

## 3️⃣ Working with Files and Directories

| OS | Command | Description |
|----|---------|------------|
| Unix/Linux/macOS | `touch file.txt` | Create an empty file |
| Windows | `type nul > file.txt` | Create an empty file |
| Unix/Linux/macOS/Windows | `mkdir my_folder` | Create a new directory |
| Unix/Linux/macOS/Windows | `rm file.txt` (Mac/Linux) / `del file.txt` (Windows) | Delete a file (permanent) |
| Unix/Linux/macOS/Windows | `rm -r my_folder` (Mac/Linux) / `rmdir /s my_folder` (Windows) | Delete a directory and its contents |
| Unix/Linux/macOS/Windows | `cp file1.txt file2.txt` | Copy `file1.txt` to `file2.txt` |
| Unix/Linux/macOS/Windows | `mv old.txt new.txt` | Rename a file |
| Unix/Linux/macOS/Windows | `mv file.txt ~/Documents` (Mac/Linux) / `move file.txt C:\Users\MyUser\Documents` (Windows) | Move file to another location |

---

## 4️⃣ Viewing and Editing Files

| OS | Command | Description |
|----|---------|------------|
| Unix/Linux/macOS | `cat file.txt` | View file contents |
| Windows | `type file.txt` | View file contents |
| Unix/Linux/macOS | `less file.txt` | View file with navigation (`q` to exit) |
| Unix/Linux/macOS | `nano file.txt` | Edit file in **Nano** (`Ctrl+X` to exit) |
| Unix/Linux/macOS | `vim file.txt` | Edit file in **Vim** (`i` to insert, `ESC + :wq` to save & exit) |
| Windows | `notepad file.txt` | Open file in Notepad |

---

## 5️⃣ File Permissions (Unix/Linux/macOS Only)

| Command | Description |
|---------|------------|
| `ls -l` | Show file permissions |
| `chmod +x script.sh` | Make a script executable |
| `chmod 755 file.sh` | Set read/write/execute permissions |
| `chown user file.txt` | Change file ownership |

Windows does not use Unix-style file permissions but allows setting permissions through GUI settings or PowerShell.

---

## 6️⃣ Process Management

| OS | Command | Description |
|----|---------|------------|
| Unix/Linux/macOS/Windows | `ps` (Mac/Linux) / `tasklist` (Windows) | List running processes |
| Unix/Linux/macOS/Windows | `top` (Mac/Linux) / `taskmgr` (Windows) | Show active processes in real-time |
| Unix/Linux/macOS/Windows | `kill PID` (Mac/Linux) / `taskkill /PID PID /F` (Windows) | Kill a process with a specific PID |
| Unix/Linux/macOS/Windows | `ctrl + C` | Stop a running process |

---

## 🎯 Final Challenge: Practice

Encourage students to practice with the following:

1. **Navigate directories:** Create a folder, move into it, create a file.
2. **Edit files:** Use `nano` or `vim` (Mac/Linux) or `notepad` (Windows) to write a script.
3. **Change permissions:** Make a script executable and run it (Unix/Linux/macOS only).
4. **Use Git:** Initialize a Git repo, commit a file, push to GitHub.

---

## 🎉 Conclusion

Mastering the terminal is an essential skill for developers. This crash course covers the **most essential** commands, but students should practice them in real-world projects to become comfortable.

Happy coding! 🚀
