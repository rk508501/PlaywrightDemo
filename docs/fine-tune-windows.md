# Windows Commands to Speed Up System and Clear Temporary Files

This guide provides a list of Windows commands and methods to clear temporary files, optimize system performance, and free up disk space. These commands are designed to be run in **Command Prompt (CMD)**, **PowerShell**, or via the **Run** dialog box. They are safe when executed as described, but always ensure no critical applications are running before deleting temporary files, and create a system restore point for safety. This is tailored for an automation tester familiar with tools like Playwright and Cypress, ensuring clear, actionable steps.

**Note**: Run Command Prompt or PowerShell as an administrator where indicated to avoid permission issues. Use caution with commands that delete files permanently, and avoid deleting files in use by active processes.

## Commands and Methods

### 1. Clear User Temporary Files
- **Purpose**: Deletes temporary files created by user applications (e.g., cached data, temporary program files).
- **Command (CMD)**:
  ```cmd
  del /q /f /s %TEMP%\*.*
  ```
  - `/q`: Suppresses confirmation prompts.
  - `/f`: Forces deletion of read-only files.
  - `/s`: Deletes files in all subdirectories.
- **Alternative (Run Dialog)**:
  1. Press `Win + R`, type `%temp%`, and press Enter.
  2. In File Explorer, press `Ctrl + A` to select all files, then `Shift + Delete` to permanently delete (or `Delete` to move to Recycle Bin).
- **Notes**:
  - Located at `C:\Users\<Username>\AppData\Local\Temp`.
  - Files in use will be skipped automatically.
  - Source: GeeksforGeeks, Trend Micro.[](https://www.geeksforgeeks.org/techtips/how-to-delete-temporary-files-in-windows-10/)[](https://helpcenter.trendmicro.com/en-us/article/tmka-20576)

### 2. Clear System Temporary Files
- **Purpose**: Removes temporary files created by the Windows operating system.
- **Command (CMD)**:
  ```cmd
  del /q /f /s C:\Windows\Temp\*.*
  ```
- **Alternative (Run Dialog)**:
  1. Press `Win + R`, type `temp`, and press Enter.
  2. In File Explorer, select all files (`Ctrl + A`) and delete (`Shift + Delete` or `Delete`).
- **Notes**:
  - Requires admin privileges for the command.
  - Located at `C:\Windows\Temp`.
  - Source: SysTools Group.[](https://www.systoolsgroup.com/how-to/delete-temporary-files/)

### 3. Clear Prefetch Files
- **Purpose**: Deletes prefetch files used to speed up application launches, which can accumulate and consume space.
- **Command (CMD)**:
  ```cmd
  del /q /f /s C:\Windows\Prefetch\*.*
  ```
- **Alternative (Run Dialog)**:
  1. Press `Win + R`, type `prefetch`, and press Enter.
  2. Click "Continue" if prompted for permission.
  3. Select all files (`Ctrl + A`) and delete.
- **Notes**:
  - Prefetch files regenerate as needed, so deletion is safe but may temporarily slow app launches.
  - Source: BitRecover.[](https://www.bitrecover.com/blog/make-your-computer-10-times-faster/)

### 4. Run Disk Cleanup via Command
- **Purpose**: Uses the built-in Disk Cleanup tool to remove temporary files, system files, and Recycle Bin contents.
- **Command (CMD)**:
  ```cmd
  cleanmgr /d C: /sagerun:1
  ```
  - `/d C:`: Specifies the C: drive (adjust for other drives).
  - `/sagerun:1`: Runs a preconfigured cleanup profile (set up first with `/sageset:1`).
- **Setup (Optional)**:
  1. Run `cleanmgr /sageset:1` to open the Disk Cleanup settings.
  2. Select options like "Temporary Files," "Temporary Internet Files," and "Recycle Bin."
  3. Save the profile for use with `/sagerun:1`.
- **Notes**:
  - Automates cleanup of multiple file types.
  - Source: Microsoft Learn.[](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cleanmgr)

### 5. Clear DNS Cache
- **Purpose**: Resolves network issues and improves browsing speed by clearing cached DNS entries.
- **Command (CMD)**:
  ```cmd
  ipconfig /flushdns
  ```
- **Notes**:
  - Run as administrator for reliability.
  - Useful if browsing is slow due to stale DNS records.
  - Source: MiniTool.[](https://www.minitool.com/backup-tips/clean-computer-using-cmd.html)

### 6. Clear Windows Store Cache
- **Purpose**: Removes cached data from the Microsoft Store to fix app issues and free up space.
- **Command (CMD)**:
  ```cmd
  wsreset.exe
  ```
- **Notes**:
  - Opens a blank CMD window, clears the cache, and closes automatically.
  - Source: MiniTool.[](https://www.minitool.com/backup-tips/clean-computer-using-cmd.html)

### 7. Defragment Hard Drive (HDD Only)
- **Purpose**: Reorganizes fragmented data on traditional hard drives to improve file access speed.
- **Command (CMD, Admin)**:
  ```cmd
  defrag C:
  ```
  - Replace `C:` with the target drive letter.
- **Notes**:
  - Do **not** use on SSDs, as it can reduce their lifespan.
  - Run as administrator.
  - Source: MiniTool.[](https://www.minitool.com/backup-tips/clean-computer-using-cmd.html)

### 8. Clear Browser Cache (Manual, No Command)
- **Purpose**: Removes temporary internet files (cached web pages, cookies) to free space and improve browsing.
- **Steps** (for major browsers):
  1. Open browser settings:
     - **Edge/Chrome**: Go to `Settings > Privacy and Security > Clear Browsing Data`.
     - **Firefox**: Go to `Options > Privacy & Security > Clear History`.
  2. Select "Cached images and files" and a time range (e.g., "All time").
  3. Click "Clear Data."
- **Notes**:
  - No direct CMD command for all browsers, but you can clear Internet Explorer/Edge cache via:
    ```cmd
    RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 8
    ```
  - Repeat for each browser used.
  - Source: GeeksforGeeks, Lifewire.[](https://www.geeksforgeeks.org/techtips/how-to-delete-temporary-files-in-windows-10/)[](https://www.lifewire.com/how-to-delete-temporary-files-in-windows-2624709)

### 9. Create a Batch File for Automated Cleanup
- **Purpose**: Combines multiple cleanup commands into a single script for regular use.
- **Steps**:
  1. Open Notepad and paste:
     ```cmd
     @echo off
     del /s /f /q %temp%\*.*
     rd /s /q %temp%
     md %temp%
     del /s /f /q C:\Windows\Temp\*.*
     rd /s /q C:\Windows\Temp
     md C:\Windows\Temp
     del /s /f /q C:\Windows\Prefetch\*.*
     ipconfig /flushdns
     wsreset.exe
     ```
  2. Save as `clean_temp.bat` (select "All Files" in Save As type).
  3. Run as administrator to execute all commands.
- **Optional Automation**:
  - Place the `.bat` file in `%appdata%\microsoft\windows\start menu\programs\startup` to run at boot.
  - Source: TheGeekPage, MiniTool.[](https://systembooster.minitool.com/boost-pc/how-to-delete-temp-files.html)[](https://thegeekpage.com/make-your-windows-10-pc-ultra-fast/)
- **Notes**:
  - Creates new empty `Temp` folders after deletion to prevent errors.
  - Skips files in use.

### 10. Check System Integrity (Optional)
- **Purpose**: Scans and repairs corrupted system files that may slow performance.
- **Command (CMD, Admin)**:
  ```cmd
  sfc /scannow
  ```
- **Notes**:
  - Repairs system files that could cause slowdowns.
  - Run as administrator.
  - Source: X post by @ahmadta331.

### 11. Enable Storage Sense for Automatic Cleanup
- **Purpose**: Automates deletion of temporary files and Recycle Bin contents.
- **Steps (No Command)**:
  1. Open `Settings > System > Storage`.
  2. Toggle on `Storage Sense`.
  3. Click "Configure Storage Sense" to set schedules (e.g., weekly cleanup of temp files).
- **Notes**:
  - No command-line equivalent, but highly effective for ongoing maintenance.
  - Source: AVG, NinjaOne.[](https://www.avg.com/en/signal/top-three-ways-to-clean-temporary-files-from-your-computer)[](https://www.ninjaone.com/blog/delete-temporary-files-windows-10/)

## Additional Tips
- **Safety**:
  - Create a system restore point before bulk deletions: `Win + R`, type `rstrui`, and follow prompts.
  - Avoid deleting files in `C:\Windows\System32` or active system files like `hiberfil.sys` or `pagefile.sys`.
  - If files can’t be deleted (in use), restart the PC or boot into Safe Mode and retry.
- **Benefits** (from sources):
  - Frees disk space, improving file access and reducing 100% disk usage.
  - Enhances system performance by reducing clutter.
  - Improves privacy by clearing browsing data and logs.
  - Source: GeeksforGeeks, Trend Micro.[](https://www.geeksforgeeks.org/techtips/how-to-delete-temporary-files-in-windows-10/)[](https://helpcenter.trendmicro.com/en-us/article/tmka-20576)
- **Automation Tester Context**:
  - Use these commands in scripts (e.g., Playwright/Cypress pre-test setup) to ensure a clean environment for UI testing.
  - Example: Add the batch file to a CI/CD pipeline (like the GitHub Actions workflow you requested) to clear temp files before tests.
- **Frequency**: Run weekly or monthly, depending on system usage.
- **Tools**: Consider third-party cleaners like MiniTool System Booster or CCleaner for automated scans, but verify their safety.[](https://systembooster.minitool.com/boost-pc/how-to-delete-temp-files.html)[](https://thegeekpage.com/make-your-windows-10-pc-ultra-fast/)

## Example Batch Script for Automation
Save as `optimize_system.bat` and run as administrator:
```cmd
@echo off
echo Clearing temporary files...
del /q /f /s %TEMP%\*.*
del /q /f /s C:\Windows\Temp\*.*
del /q /f /s C:\Windows\Prefetch\*.*
echo Flushing DNS cache...
ipconfig /flushdns
echo Clearing Windows Store cache...
wsreset.exe
echo Running Disk Cleanup...
cleanmgr /d C: /sagerun:1
echo Done!
pause
```

## Notes
- **Run as Administrator**: For commands like `defrag`, `sfc`, or system folder deletions, right-click CMD/PowerShell and select "Run as administrator."
- **Backup**: If critical data might be in temp folders (e.g., unsaved Excel files like `~$example.xlsx`), check before deleting or use a recovery tool like 4DDiG.[](https://4ddig.tenorshare.com/windows-recovery-solutions/how-to-delete-temporary-files-in-windows-10.html)
- **SSD Users**: Skip `defrag` to avoid reducing SSD lifespan.
- **Recycle Bin**: Empty the Recycle Bin after deletions to fully free space (`Win + R`, `shell:RecycleBinFolder`, `Empty Recycle Bin`).

This list provides a comprehensive set of commands to optimize your Windows system, leveraging your automation testing skills for efficient execution. Run them manually or integrate into scripts for regular maintenance. For further assistance or integration with your GitHub Actions workflow, let me know!