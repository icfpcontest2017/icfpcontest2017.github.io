ICFP 2017 Programming Contest VM
================================

Log into the virtual machine as user "punter" with password "icfp2017".
The root password is also "icfp2017".  Note that during the contest your
program will be evaluated on a standard user account and will not have
root permissions.

The VM comes in OVA format, which is supported by VirtualBox, VMWare
and other virtualization software. The VM by default has 4GB of RAM
and 2 CPUs. You can adjust these values to better match your host
machine. The operating system installed on the VM is Debian 9, with no
swap partition. You could add one on your own but if you really need
it then this is an indication that you are in trouble --- there will
be a limit on memory usage during solution evaluation. Below is a list
of software currently installed on the VM and available during the
contest.


## Programming languages and compilers

  * Agda 2.5.2
  * Bash 4.4.12
  * C (gcc 7.1.0)
  * C# (mono-mcs 5.0.1.1)
  * Clojure 1.8.0
  * COBOL (OpenCobol 1.1.0)
  * Common Lisp (sbcl 1.3.19)
  * C++ (g++ 7.1.0)
  * D (gdc 6.4.0)
  * Dotnet 2.0.0-preview2-006497
  * Elixir 1.5.0-1
  * Erlang 9.0
  * F# 4.1
  * F* 0.9.3.0-beta1
  * Forth (gforth 0.7.3)
  * Fortran (gfortran 7.1.0)
  * Haskell (GHC 8.0.1)
  * Go 1.7.6
  * Groovy 2.4.8
  * Idris 1.0
  * Java (JDK 1.8.0u141)
  * JavaScript (nodejs 8.2.1)
  * Kotlin 1.1.3-2
  * Links 0.6.1 (invoke as "rlwrap linx")
  * LLVM + Clang 3.8 (clang-3.8)
  * LLVM + Clang 4.0 (clang-4.0)
  * OCaml 4.04.1
  * Perl 5.24.1
  * PHP 7.0.20-2
  * Picat 2.1#3
  * Prolog (SWI Prolog 7.2.3)
  * Python (python: 2.7.13+, python3: 3.5.4rc1, python3.6: 3.6.2)
  * PyPy 5.8.0
  * Pyret (compiled from git repository; located in $HOME/pyret-lang)
  * R 3.4.1
  * Racket 6.9
  * Ruby 2.3.3p222
  * Rust 1.17.0
  * Scala 2.12.2
  * Scheme (MIT Scheme 9.1.1)
  * Standard ML (MLton 20130715, SML of New Jersey 110.79)
  * Tcl 8.6
  * TeX (TeX Live 2017/Debian)
  * Z3 4.4.1
  * Zsh 5.3.1


## Editors

  * emacs 24.5.1
  * nano 2.8.6
  * vim 8.0.550


## Libraries

  * Boost
  * libgmp
  * Python3-{pip,virtualenv,umpu,scipy,pandas,sklearn}
  * zlib

## VCS

  * darcs 2.12.5
  * git 2.13.3
  * mercurial 4.0
  * subversion 1.9.6


## Tools

  * automake 1.15.1
  * bazel 0.5.3
  * cabal 1.24.0.2
  * cargo 0.18.0
  * cmake 3.9.0
  * cmake-curses-gui 3.9.0-1
  * gdb 7.12-6
  * gnu parallel 20161222
  * gradle 3.2.1
  * lldb 3.8.1
  * ivy 2.4.0-3
  * make 4.1
  * maven 3.3.9
  * npm 5.3.0
  * opam 1.2.2
  * sbt 0.13.15.3
  * stack 1.4.0
  * valgrind 3.13.0
