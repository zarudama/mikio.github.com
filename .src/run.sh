#!/bin/bash
PWD=`pwd`
PUBLIC=~/dev/mikio.github.com
MISAKI=~/dev/misaki-orgmode
SRC=$PUBLIC/.src
rm -rf $PUBLIC/*.html
rm -rf $PUBLIC/*.xml
rm -rf $PUBLIC/page*
rm -rf $PUBLIC/tag
rm -rf $PUBLIC/article
cd $MISAKI;
#lein run $SRC --compile
lein run $SRC
cd $PWD

