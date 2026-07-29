import React from 'react';
import EditEbook from '@/components/writer/edit-ebook';

const EditEbookPage = async ({ params }) => {
    const { id } = await params;
    return <EditEbook ebookId={id} />;
};

export default EditEbookPage;