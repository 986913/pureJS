/* 
`parseInt` operate on string. Thus, it call casting function `String`and pass its argument to it. 

Note: If number has more than 7 decimal digits then `String` convert it to exponential. e.g.
    - String(0.000001) => '0.000001'
    - String(0.0000001) => '1e-7'
*/

console.log(parseInt(0.00001)); // String(0.00001)=>'0.00001' => 0
console.log(parseInt(0.000001)); // String(0.000001) => '0.000001' => 0
console.log(parseInt(0.0000001)); // String(0.0000001) => '1e-7' => 1
console.log(parseInt('0x12', 16)); // 18 (parseInt output is always in decimal. )

// 1 (parseInt can't understand if it is exponential, it will stop at first alphabhet)
// assume parsing `1z4` so what will be output of parseInt? Again 1.
console.log(parseInt('1e2')); // 1
