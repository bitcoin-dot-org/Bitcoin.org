# Some Animated GIF Hints

An excellent set of background information can be found here:

    http://www.imagemagick.org/Usage/anim_basics/

1. Create source images. GraphViz supports direct GIF output, but its
   white background is not-quite-white and its transparent backgroud is
   hideous---so we output to PNG and then convert to GIF.

        for f in *dot ; do dot -o ${f/.dot}.png -T png $f ; done

2. Create animated GIF using ImageMagick. Manually prefix first frame
   and suffix last frame to provide a brief pause in the animation on
   those frames. This wastes space but the optimization removes all of
   that wasted space except for 3 bytes.

        convert -delay 100 \
          en-merkleblock-parsing-001.gif \
          *gif \
          en-merkleblock-parsing-011.gif \
          -loop 0 \
          animated-en-merkleblock-parsing.gif

3. Compress animated GIF (118 KB -> 15 KB in this example). You may need
   to play with color settings; 8 worked in this example but 4 was too
   few. Fewer colors (base-2) results in much better compression.

        gifsicle -b -O3 --colors 8 --no-background \
          animated-en-merkleblock-parsing.gif

