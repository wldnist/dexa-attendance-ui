import { AddEdit } from 'components/users';
import { userService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    // const user = await userService.getById(params.id);
    const res = await fetch(`http://localhost:3002/profiles/${params.id}`);
    const data = await res.json();

    return {
        props: { data }
    }
}