#!/bin/bash

PWD=`pwd`
PUBLIC=~/dev/mikio.github.com
MISAKI=~/dev/misaki-orgmode
SRC=$PUBLIC/.src

function finally() {
    echo finally!
    rm $SRC/template/posts
    exit 1
}

function clean() {
    rm -rf $PUBLIC/*.html
    rm -rf $PUBLIC/*.xml
    rm -rf $PUBLIC/page*
    rm -rf $PUBLIC/tag
    rm -rf $PUBLIC/article
}

trap 'finally' 2
clean
ln -s ~/Dropbox/org/posts $SRC/template/posts 
cd $MISAKI;
#lein run $SRC --compile
lein run $SRC
cd $PWD

