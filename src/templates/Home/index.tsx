import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddCircleOutline,
  Edit,
  Logout,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import { getProducts } from "../../services/product";
import { Product } from "../../types/product";

import { Container, Header } from "./styles";

const Template = () => {
  const navigate = useNavigate();
  const { Logout: handleLogout } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);

  getProducts()
    .then((data) => setProducts(data))
    .catch((error) => console.error(error));

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = products.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Container>
        <Header>
          <Typography variant="h4" component="p">
            Produtos
          </Typography>
        </Header>

        <Grid container spacing={2} sx={{ marginBottom: "24px" }}>
          <Grid item xs={8}>
            <TextField
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "40%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment aria-label="start" position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "end !important",
              padding: "20px",
            }}
          >
            <Button
              type="button"
              color="primary"
              variant="outlined"
              sx={{ marginRight: "20px" }}
              onClick={() => navigate("/product")}
            >
              <AddCircleOutline fontSize="small" sx={{ marginRight: "8px" }} />
              Adicionar produto
            </Button>

            <Button
              type="button"
              color="error"
              variant="outlined"
              onClick={handleLogout}
            >
              <Logout fontSize="small" sx={{ marginRight: "8px" }} /> Sair
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Vendidos</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Avatar alt="Remy Sharp" src={item.avatar} />
                    </TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.marca}</TableCell>
                    <TableCell>{item.preco}</TableCell>
                    <TableCell>{item.qt_estoque}</TableCell>
                    <TableCell>{item.qt_vendas}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        sx={{ marginRight: "20px" }}
                        color="info"
                      >
                        <Visibility />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Box>
  );
};

export default Template;
