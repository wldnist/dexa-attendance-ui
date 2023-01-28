import { AddEdit } from 'components/profiles';
import { apiUrlProfileSvc } from 'config';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const res = await fetch(`${apiUrlProfileSvc}/${params.id}`);
    const data = await res.json();

    return {
        props: { data }
    }
}