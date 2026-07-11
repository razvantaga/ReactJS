export default function PaginationBtns({ setCurrentPage, currentPage, totalPages }) {
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mt-6 flex items-center justify-end py-2">
            <button className={` bg-sky-500/50 p-2 text-center text-sm font-semibold focus:outline-none cursor-pointer ${currentPage === 1 ? "text-gray-500 bg-white" : "text-white transition-colors hover:bg-sky-500/75"} `}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}  >
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                    <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
            </button>

            {(() => {
                const pageNeighbors = 1;
                const range = [];

                for (let i = 1; i <= totalPages; i++) {
                    if (i === 1 || i === totalPages || (i >= currentPage - pageNeighbors && i <= currentPage + pageNeighbors)) {
                        range.push(i);
                    } else if (range[range.length - 1] !== '...') {
                        range.push('...');
                    }
                }

                return range.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${index}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white/50 bg-sky-600/20">
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <button key={page} onClick={() => paginate(page)} className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 cursor-pointer 
                        ${isActive ? 'bg-sky-700' : 'bg-sky-600/50 hover:bg-sky-700/50'}`} >
                            {page}
                        </button>
                    );
                });
            })()}


            <button className={` bg-sky-500/50 p-2 text-center text-sm font-semibold focus:outline-none cursor-pointer ${currentPage === totalPages ? "text-gray-500 bg-white" : "text-white transition-colors hover:bg-sky-500/75"}  `}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages} >
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                    <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}