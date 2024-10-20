function fibonacci(n) {
    let deret = [0, 1];
    
    if (n <= 0) {
        return [0];
    } else if (n === 1) {
        return [0, 1];
    }

    for (let i = 2; i <= n; i++) {
        deret[i] = deret[i - 1] + deret[i - 2];
    }

    return deret;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
