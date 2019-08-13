@ECHO OFF

IF EXIST .\dist\ GOTO DirectoryExists
GOTO Build

:DirectoryExists
    RD /S /Q .\dist\
    ECHO "Removed dist directory"

:Build
    ECHO "Let's create!"
    MKDIR .\dist\
    ECHO "And again"
    ROBOCOPY .\shared\src\ .\dist\shared\ *.ts /E
    ROBOCOPY .\server\src\ .\dist\server\ *.ts /E
    COPY .claspignore .\dist\
    COPY appsscript.json .\dist\

    clasp push