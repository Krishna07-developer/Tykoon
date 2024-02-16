import { Box, Skeleton } from "@mui/material"

function Loader() {
    return <>
			<Box sx={{background:'white'}}>
				<Skeleton variant="rectangular" sx={{ bgcolor: '#cee4ff', borderRadius:'10px' }} height={248} animation="wave" />
				<Skeleton variant="rectangular" sx={{ bgcolor: '#cee4ff', borderRadius:'10px', marginTop:'20px' }} height={148} animation="wave" />
				<Skeleton variant="rectangular" sx={{ bgcolor: '#cee4ff', borderRadius:'10px' , marginTop:'20px'}} height={248} animation="wave" />
			</Box> 
    </>
}

export default Loader