+++
draft = false
title = 'Projects'
+++

## PawnIDE

**Description:** A full IDE for the Pawn scripting language, built in Python 
with Qt. Pawn is used for scripting SA-MP (San Andreas Multiplayer) and 
Counter-Strike 1.6 game servers. Rather than relying on basic text editors, 
PawnIDE brings modern development tooling to the language: syntax highlighting, 
intelligent code completion, real-time error diagnostics, an integrated build 
system, and debugging with breakpoints and variable inspection — all in one 
place.

**Technologies:** Python, Qt (PyQt), QScintilla

**GitHub:** [View on GitHub](https://github.com/mmlinaric/PawnIDE)

---

## PyWebshop

**Description:** PyWebshop is an e-commerce platform built with Django. It features a fully functional shopping cart, user authentication, product management, and order processing.

**Technologies:** Django, Python, PostgreSQL, HTML/CSS

**GitHub:** [View on GitHub](https://github.com/mmlinaric/pywebshop)

---

## Social Network

**Description:** A social networking site developed as my final high school project using Django. It includes features like user profiles, posts, comments, and friend requests.

**Technologies:** Django, Python, SQLite, HTML/CSS

**GitHub:** [View on GitHub](https://github.com/mmlinaric/social-network)

---

## TP-Link EasySmartBackup

**Description:** TP-Link's Easy Smart switches (TL-SG105E, TL-SG108E, etc.) have no SSH or CLI access — the only way to back up their configuration is through the web interface, manually. This tool automates that process by  reverse-engineering the switch's web authentication flow, handling session  cookies, and downloading the binary config file programmatically. Supports multiple switches via a config file, validates backups to catch silent failures (e.g. receiving a login page instead of a config), generates MD5 checksums, and is designed to run unattended in a cron job.

**Technologies:** Bash, curl, networking

**GitHub:** [View on GitHub](https://github.com/mmlinaric/tplink-easysmartbackup)

---

## Modernstack

**Description:** A COBOL application connecting to IBM Db2, built for a 
Database Connectivity course. The challenge: use a non-Java language with 
a non-MySQL database. The solution: COBOL (1959) talking to IBM Db2 via 
GixSQL — an ESQL preprocessor — over ODBC, all containerized with Docker. 
Getting these technologies to cooperate required digging through obscure 
documentation, debugging compiler toolchains, and leveraging Docker's 
layer caching to keep rebuild times sane after the initial 15-minute Db2 
startup. It works.

**Technologies:** COBOL, IBM Db2, Docker, GixSQL, ODBC

**GitHub:** [View on GitHub](https://github.com/mmlinaric/modernstack)