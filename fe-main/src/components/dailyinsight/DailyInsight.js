import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const DailyInsight = () => {
  const [dailyInsights, setDailyInsights] = useState([]);

  useEffect(() => {
    getDailyInsights();
  }, []);

  const getDailyInsights = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/dailyinsight");
      setDailyInsights(response.data);
    } catch (error) {
      console.error("Error fetching daily insights:", error);
    }
  };

  const deleteDailyInsight = async (id) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");

      if (confirmed) {
        await axios.get(`http://localhost:8080/api/dailyinsight/delete/${id}`);
        getDailyInsights();
      }
    } catch (error) {
      console.error("Error deleting daily insight:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Daily Insight</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Data Daily Insight
              </h5>
              <Link to="/dailyinsight/add">
                <Button variant="success" style={{ backgroundColor: "#FEA503", borderColor: "#FEA503" }}>+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover width={"100%"}>
                <thead>
                  <tr>
                    <th width={"5%"}>#</th>
                    <th width={"15%"}>Image</th>
                    <th width={"15%"}>Video</th>
                    <th width={"16%"}>Content Name</th>
                    <th width={"30%"}>Description</th>
                    <th width={"13%"}>Date</th>
                    <th width={"15%"}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyInsights.map((dailyInsight, index) => (
                    <tr key={dailyInsight.id_daily_insight}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/images/daily_insight/${dailyInsight.image}`}
                          alt="Daily Insight"
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      </td>
                      <td>
                        <video width="200" height="200" controls>
                          <source src={`http://localhost:8080/videos/daily_insight/${dailyInsight.video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </td>
                      <td>{dailyInsight.judul_content}</td>
                      <td>{dailyInsight.deskripsi}</td>
                      <td>{dailyInsight.tanggal_upload}</td>
                      <td>
                        <Link
                          to={`/dailyinsight/edit/${dailyInsight.id_daily_insight}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteDailyInsight(dailyInsight.id_daily_insight)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DailyInsight;
