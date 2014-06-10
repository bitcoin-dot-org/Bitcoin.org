set samples 1000000
set yrange [-4:4]

set terminal svg size 600,200 font "Sans,12"
set output "en-ecdsa-compressed-public-key.svg"

plot [-3:8] sqrt(x**3+7) \
     ,-sqrt(x**3+7) \
     ,"< echo 1 2.83" u 1:2 title "x,y=1.00,2.83" with points

## Remember to run optipng -o7 on output before commiting
set terminal png size 600,200 font "Sans,12"
set output "en-ecdsa-compressed-public-key.png"

replot
