#!/bin/bash
PWD=`pwd`
PUBLIC=~/dev/mikio.github.com/misaki-orgmode
DEMO=~/dev/misaki-orgmode/sample/public
rm -rf $PUBLIC/* 
cp -pr $DEMO/* $PUBLIC

