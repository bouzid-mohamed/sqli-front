import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Stack, Pagination, Paper, InputBase, IconButton, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
// components
import { BlogPostCard, BlogPostsSearch } from '../../../ui-component/blogCard';
//
import LivreurServices from 'services/livreur-services/LivreurServices';
import * as React from 'react';
import { useLocation } from 'react-router';
import { createBrowserHistory } from 'history';
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------
import MainCard from 'ui-component/cards/MainCard';
import ProductSkeleton from 'ui-component/cards/Skeleton/livreurCard';
import AddIcon from '@mui/icons-material/Add';
import postServices from 'services/post-services/postServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ----------------------------------------------------------------------
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function Blog() {
    let query = useQuery();

    const [livreurs, setLivreurs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [numberPages, setNumberPages] = React.useState(0);
    const [page, setPage] = React.useState(parseInt(query.get("page")));
    const [searchValue, setSearchValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelete] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
    };
    const deleteLivreur = (post) => {
        setOpen(true);
        setIdDelete(post)
    }
    const confirmDeleteLivreur = () => {
        if (idDelete != null) {
            setOpen(false);
            setLoading(true);
            postServices.deleteLivreur(idDelete.id).then(() => {
                LivreurServices.getAll(query.get("page"), query.get("search")).then((res) => {
                    setLivreurs(res.data[0]);
                    setNumberPages(res.data["pagination"])
                    setLoading(false);
                    toast(" Compte livreur " + idDelete.nom + ' ' + idDelete.prenom + " est supprimé avec succès");

                });

            })

        }
    }

    React.useEffect(
        () => {
            if (query.get('search') != null) {
                setSearchValue(query.get('search'))
            }
            LivreurServices.getAll(query.get("page"), query.get("search")).then((res) => {
                setLivreurs(res.data[0]);
                setNumberPages(res.data["pagination"])
                setLoading(false);
            });


        }, []);
    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        if (query.get('search') != null) {
            history.push("/post/livreur/list?page=" + value + "&search=" + searchValue);
        } else {
            history.push("/post/livreur/list?page=" + value);

        }
        window.location.reload();
    };
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/post/livreur/list?page=1&search=" + searchValue);
            window.location.reload();
        }
    }

    return (
        <MainCard title="Livreurs" >
            <Stack
                direction="row"
                flexWrap="wrap-reverse"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >

                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                    <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                        <Button href={'/post/livreur/add'} variant="outlined" startIcon={<AddIcon />}>
                            Ajouter</Button>
                    </Stack>


                </Stack>
            </Stack>
            <Stack
                direction="row"
                flexWrap="wrap-reverse"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ mb: 5 }}

            >


                <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                    <Paper style={{ 'border': "1px solid #5e35b1" }}
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', width: 400 }}
                    >

                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Rechercher"
                            inputProps={{
                                'aria-label': 'Rechercher'
                            }}
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}


                        />
                        <IconButton onClick={event => window.location.href = "/post/livreur/list?page=1&search=" + searchValue
                        }
                            aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                    </Paper>
                </Stack>

            </Stack>
            <Grid container spacing={3}>
                {loading ? (


                    <>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((product) => (
                            <Grid key={product} item xs={12} sm={6} md={3}>
                                <ProductSkeleton />
                            </Grid>
                        ))}

                    </>
                ) : (
                    livreurs.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index} deleteLivreur={() => deleteLivreur(post)} />
                    ))
                )}
            </Grid>
            <Stack direction="row-reverse" marginTop={"2%"}>
                <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
            </Stack>

            {
                open ? (<div>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Voulez-vous supprimer ce livreur"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Let Google help apps determine location. This means sending anonymous
                                location data to Google, even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Annuler</Button>
                            <Button onClick={confirmDeleteLivreur} autoFocus>
                                Confirmer
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>) : (null)}
            <ToastContainer />

        </MainCard>
    );
}
