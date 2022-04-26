import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Stack, Pagination } from '@mui/material';
// components
import ElevatorIcon from '@mui/icons-material/Elevator';
import { BlogPostCard, BlogPostsSearch } from '../../../ui-component/blog';
//
import POSTS from '../../../utils/blog';
import LivreurServices from 'services/livreur-services/LivreurServices';
import * as React from 'react';
import { useLocation } from 'react-router';
import { createBrowserHistory } from 'history';

// ----------------------------------------------------------------------
import MainCard from 'ui-component/cards/MainCard';
import ProductSkeleton from 'ui-component/cards/Skeleton/livreurCard';


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

    React.useEffect(
        () => {

            LivreurServices.getAll().then((res) => {
                setLivreurs(res.data[0]);
                setNumberPages(res.data["pagination"])
                setLoading(false);
            });


        }, []);
    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        history.push("/post/livreur/list?page=" + value);
        window.location.reload();
    };

    return (
        <MainCard title="Livreurs" >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<ElevatorIcon />}
                    href="/livreur/add"
                >
                    Ajouter un Livreur
                </Button>
            </Stack>

            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                <BlogPostsSearch posts={POSTS} />
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
                        <BlogPostCard key={post.id} post={post} index={index} />
                    ))
                )}
            </Grid>
            <Stack direction="row-reverse" marginTop={"2%"}>
                <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
            </Stack>

        </MainCard>
    );
}
