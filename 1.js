let barang1 = 4550
let barang2 = 5330
let barang3 = 8653

// Silahkan dicoba aja mas 

function hitungBarang(kualitas, qty) {

    if (kualitas == barang1) {
        if (qty >= 13) {
            const total = barang1 * qty
            const barangDiscount1 = kualitas - 231
            const potongan = 231 * qty
            const hargaTotal = barangDiscount1 * qty
            console.log('Ini Total harga' + ' = ' + total)
            console.log('Ini potongan nya' + ' = ' + potongan)
            console.log('Ini Total yang harus dibayar' + ' = ' + hargaTotal)
        } else {
            const hargaTotal = kualitas * qty
            console.log('Ini total harga' + ' = ' + hargaTotal)
            console.log('Ini potongan nya' + ' = ' + 0)
            console.log('Ini Total yang harus dibayar' + ' = ' + hargaTotal)
        }
    } else if (kualitas == barang2) {
        if (qty >= 7) {
            const total = barang2 * qty
            const barangDiscount2 = kualitas * 23 / 100
            const potongan = barangDiscount2 * qty
            const discountBarang2 = barang2 - barangDiscount2
            const hargaTotal = discountBarang2 * qty
            console.log('Ini Total harga' + ' = ' + total)
            console.log('Ini potongan nya' + ' = ' + potongan)
            console.log('Ini Total yang harus dibayar' + ' = ' + hargaTotal)
        } else {
            const hargaTotal = kualitas * qty
            console.log('Ini total harga' + ' = ' + hargaTotal)
            console.log('Ini potongan nya' + ' = ' + 0)
            console.log('Ini Total yang harus dibayar' + ' = ' + hargaTotal)
        }
    } else if (kualitas == barang3) {
        const hargaTotal = kualitas * qty
        console.log('Ini total harga' + ' = ' + hargaTotal)
        console.log('Ini potongan nya' + ' = ' + 0)
        console.log('Ini Total yang harus dibayar' + ' = ' + hargaTotal)
    }
}

hitungBarang(barang3, 2)
