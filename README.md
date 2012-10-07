JSBoy - The gameboy color emulator for javascript
Bryon Vandiver (unicdk@gmail.com)
=================================

Introduction
------------
This was my first attempt at writing an HTML5 (canvas) javascript application.
Currently, it is self contained and only requires that it be initialized with a
2d context, preferably 160x144px in size or greater.  This is done by passing 
an array and a name which is used for web storage (battery backup)

Strong typed rom images are allowed, but you will see no performance increase
due to the use of delegates for virtual memory accesses


Technical Features
------------------
This emulator features a number of performance optimizations in order to keep
performance at a maximum;  this includes interrupt prediction and the use of
memory i/o delegates for fast memory accesses.

Usage
-----
Due to laziness on my part, I will not be documenting the internal structure
of jsboy immediately.  This also gives me flexibility to change inner-workings
for speed considerations.  Consult index.html for current implementation details

If you wish to use it as is, place some roms in the project folder and run this:

    find . -name "*.gb*" > gamelist    #(*nix systems only)

please note that Chrome will not allow XMLHttpRequests on the local file system
so you may need to run a lightweight http server to run locally.

Bugs
----
Predicitions are off
Noise playback frequency is wrong (a guess at best)

