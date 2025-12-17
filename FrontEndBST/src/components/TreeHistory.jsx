import { useState, useEffect } from "react";
import { treeApi } from "../services/api";
import "./TreeHistory.css";

function TreeHistory() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedTree, setExpandedTree] = useState(null);

  useEffect(() => {
    loadTrees();
  }, []);

  const loadTrees = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await treeApi.getAllTrees();
      if (response.success) {
        setTrees(response.data);
      }
    } catch (err) {
      setError(err.message || "Error loading trees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tree?")) {
      return;
    }

    try {
      await treeApi.deleteTree(id);
      loadTrees();
    } catch (err) {
      setError(err.message || "Failed to delete tree");
    }
  };

  const toggleExpand = (id) => {
    setExpandedTree(expandedTree === id ? null : id);
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading trees...</p>
      </div>
    );
  }

  return (
    <div className="tree-history">
      <div className="card">
        <div className="header-row">
          <h2>Previous Trees</h2>
          <button onClick={loadTrees} className="btn btn-secondary">
            Refresh
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {trees.length === 0 ? (
          <div className="empty-state">
            <h3>No trees yet!</h3>
            <p>Create your first binary search tree to see it here.</p>
          </div>
        ) : (
          <>
            <p className="tree-count">Total trees: {trees.length}</p>

            <div className="trees-list">
              {trees.map((tree) => (
                <div key={tree.id} className="tree-card">
                  <div className="tree-card-header">
                    <h3>Tree #{tree.id}</h3>
                    <span className="tree-date">
                      {new Date(tree.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="tree-card-body">
                    <div className="tree-detail">
                      <strong>Input:</strong> {tree.inputNumbers}
                    </div>

                    <div className="button-group">
                      <button
                        onClick={() => toggleExpand(tree.id)}
                        className="btn-small btn-info"
                      >
                        {expandedTree === tree.id ? "Hide" : "Show"} Structure
                      </button>
                      <button
                        onClick={() => handleDelete(tree.id)}
                        className="btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </div>

                    {expandedTree === tree.id && (
                      <div className="tree-structure">
                        <pre>
                          {JSON.stringify(
                            JSON.parse(tree.treeStructure),
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TreeHistory;
