import { AddEdit } from 'components/users';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:3002/profiles/${params.id}`);
    const data = await res.json();

    return {
        props: { data }
    }
}