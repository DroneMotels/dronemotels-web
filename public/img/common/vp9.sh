ffmpeg -i input.mp4 -c:v libvpx-vp9 -pass 2 -b:v 1000K  \
  -g 9999 -aq-mode 0 -c:a libopus -b:a 64k -f webm output.webm

