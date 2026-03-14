import express from 'express';
import mysql from'mysql2/promise';

const app = express();
const port = 3000;

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'maomall',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 测试数据库连接
pool.getConnection()
   .then(connection => {
        console.log('数据库连接成功');
        connection.release();
    })
   .catch(error => {
        console.error('数据库连接失败:', error);
    });

// 定义一个获取商品列表的接口
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error('获取商品列表失败:', error);
        res.status(500).json({ error: '获取商品列表失败' });
    }
});

app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});