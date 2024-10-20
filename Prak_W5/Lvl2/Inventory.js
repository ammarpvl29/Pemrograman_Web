/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */

class Inventory {
    constructor(items){
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    removeItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
                break;
            }
        }
    }    
    listItems() {
        let output = '';
        for (let i = 0; i < this.items.length; i++) {
            output += this.items[i].displayDetails() + '\n';
        }
        return output.trim();
    }
}


// Jangan hapus kode di bawah ini!
export default Inventory;