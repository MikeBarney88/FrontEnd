import { useState } from "react";
import { treeApi } from "../services/api";
import "./CreateTree.css";

function CreateTree() {
  const [numbers, setNumbers] = useState("");
  const [balanced, setBalanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [treeData, setTreeData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTreeData(null);

    try {
      const response = await treeApi.createTree(numbers, balanced);

      if (response.success) {
        setTreeData(response.data);
        setNumbers("");
        setBalanced(false);
      } else {
        setError(response.error || "Failed to create tree");
      }
    } catch (err) {
      setError(err.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-tree">
      <div className="card">
        <h2>Create New Tree</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="numbers">Enter numbers (comma-separated):</label>
            <input
              type="text"
              id="numbers"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="e.g., 50, 30, 70, 20, 40, 60, 80"
              required
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={balanced}
                onChange={(e) => setBalanced(e.target.checked)}
              />
              Create a balanced tree
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Tree"}
          </button>
        </form>

        {error && <div className="alert alert-error">{error}</div>}

        {treeData && (
          <div className="tree-result">
            <h3>Tree Structure</h3>
            <pre className="tree-json">
              {JSON.stringify(JSON.parse(treeData.treeStructure), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateTree;
