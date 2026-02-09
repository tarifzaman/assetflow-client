const MyAssets = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Requested Assets</h2>
            <div className="overflow-x-auto border rounded-xl">
                <table className="table">
                    <thead className="bg-base-200 text-base-content">
                        <tr>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Data map hobe pore */}
                        <tr>
                            <td className="font-bold">Macbook M3</td>
                            <td>Returnable</td>
                            <td>09/02/2026</td>
                            <td><span className="badge badge-warning">Pending</span></td>
                            <td><button className="btn btn-xs btn-error text-white">Cancel</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyAssets;