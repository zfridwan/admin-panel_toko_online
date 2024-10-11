import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Ensure this points to your Axios instance or API service
import { Card, CardContent, Typography, Grid, Box, TextField, Button } from '@mui/material';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState('');
    const [categoryId, setCategoryId] = useState('');

    // Fetch products from the API
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    // Handle form submission for adding a new product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/products', { title, price, description, images, categoryId });
            alert(res.data.message);
            setTitle('');
            setPrice('');
            setDescription('');
            setImages('');
            setCategoryId('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Product
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Images (comma-separated URLs)"
                            variant="outlined"
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Category ID"
                            type="number"
                            variant="outlined"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit" color="primary">
                            Add Product
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{product.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {product.category ? product.category.name : 'Uncategorized'}
                                </Typography>
                                <Typography variant="body1">
                                    Rp.{product.price}
                                </Typography>
                                {/* Safeguard for images */}
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = '/default-image.jpg'; }}
                                    />
                                ) : (
                                    <img
                                        src="/default-image.jpg"
                                        alt="No Image Available"
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Products;
