import React from 'react';
import EbookDetails from '@/components/ebooks/EbookDetails';

const EbookDetailsPage = async ({ params }) => {
    const { id } = await params;
    return <EbookDetails ebookId={id} />;
};

export default EbookDetailsPage;