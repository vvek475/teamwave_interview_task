import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [order, setOrder] = useState("desc");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [sort, setSort] = useState("activity");
  const [tagged, setTagged] = useState();
  const [notTagged, setNotTagged] = useState();
  const [inTitle, setIntitle] = useState();
  const [response, setResponse] = useState();
  const [disabled, setDisabled] = useState(false);
  const [nextdisable, setNextDisable] = useState(false);

  function disable(bool) {
    setDisabled(bool);
    setNextDisable(bool);
  }

  async function handleSubmit(e, page_const = 1) {
    e.preventDefault();

    // disable all buttons till response reccieved to avoid multiple calls being made
    disable(true);

    var request_body = {};

    if (!inTitle && !tagged) {
      alert("Please enter atleast on intitle or tagged");
      disable(false);
      return;
    }
    if (page_const > 25 || page_const < 1) {
      alert("Reached maximum limit");
      disable(false);
      return;
    }
    if (page_const) {
      request_body["page"] = page_const;
      setPage(page_const);
    }
    if (pageSize) {
      request_body["pagesize"] = pageSize;
    }
    if (fromDate) {
      request_body["fromdate"] = fromDate;
    }
    if (toDate) {
      request_body["todate"] = toDate;
    }
    request_body["order"] = order;
    if (min) {
      request_body["min"] = min;
    }
    if (max) {
      request_body["max"] = max;
    }
    request_body["sort"] = sort;
    if (tagged) {
      request_body["tagged"] = tagged;
    }
    if (notTagged) {
      request_body["nottagged"] = notTagged;
    }
    if (inTitle) {
      request_body["intitle"] = inTitle;
    }

    var response_ = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request_body),
    });

    if (response_.status === 200) {
      response_ = await response_.json();
      setResponse(response_["items"]);

      if (response_["items"].length === 0) {
        const page_ = page - 1;
        setPage(page_);
      }
    } else if (response_.status === 429) {
      alert(response_.statusText);
      disable(false);
      return;
    } else {
      setResponse();
      try {
        alert("Response" + response_.status + response_.message);
      } catch {
        alert("Bad request or offline");
      }
    }
    disable(false);
  }

  function pagination_next(e) {
    const page_const = page + 1;
    handleSubmit(e, page_const);
  }

  function pagination_prev(e) {
    let page_const;
    if (page > 1) {
      page_const = page - 1;
    } else {
      page_const = 1;
    }
    handleSubmit(e, page_const);
  }

  return response ? (
    <>
      <div className="App">
        <div className="main-block results-block">
          {response.length ? (
            response.map((e) => (
              <div key={e.creation_date}>
                <p className="result-question">{e.title.slice(0, 80)}...</p>
                <a target="_blank" rel="noreferrer" href={e.link}>
                  Question link here
                </a>
              </div>
            ))
          ) : (
            <h1>No results found</h1>
          )}
        </div>
      </div>
      <div className="footer"></div>
      <div className="pagination-box">
        <button disabled={disabled} className="prev" onClick={pagination_prev}>
          prev
        </button>
        <button
          disabled={nextdisable}
          className="next"
          onClick={pagination_next}
        >
          next
        </button>
      </div>
      <button
        disabled={disabled}
        onClick={() => {
          setResponse();
          setPage(1);
        }}
        className="back-to-search"
      >
        Back to Search
      </button>
    </>
  ) : (
    <div className="App">
      <div className="main-block">
        <h1>Search</h1>
        <form action="/" onSubmit={handleSubmit}>
          <hr />

          <div className="inputbox">
            <label>Page Size</label>
            <input
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              name="pageSize"
              id="pageSize"
              placeholder="Page Size"
            />
          </div>

          <div className="inputbox">
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              name="fromDate"
              id="fromDate"
            />
          </div>

          <div className="inputbox">
            <label> To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              name="toDate"
              id="toDate"
            />
          </div>

          <div className="inputbox">
            <label>Order</label>
            <select
              name="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              id="order"
              placeholder="Order"
            >
              <option value="desc">descending</option>
              <option value="asc">ascending</option>
            </select>
          </div>

          <div className="inputbox">
            <label> Min</label>
            <input
              type="date"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              name="min"
              id="min"
            />
          </div>

          <div className="inputbox">
            <label> Max</label>
            <input
              type="date"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              name="max"
              id="max"
            />
          </div>

          <div className="inputbox">
            <label>Sort</label>
            <select
              name="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              id="sort"
            >
              <option value="activity">activity</option>
              <option value="votes">votes</option>
              <option value="creation">creation</option>
              <option value="relevance">relevance</option>
            </select>
          </div>

          <div className="inputbox">
            <label>Tagged</label>
            <input
              type="text"
              value={tagged}
              onChange={(e) => setTagged(e.target.value)}
              name="tagged"
              id="tagged"
              placeholder="Tagged"
            />
          </div>

          <div className="inputbox">
            <label>Not Tagged</label>
            <input
              type="text"
              value={notTagged}
              onChange={(e) => setNotTagged(e.target.value)}
              name="notTagged"
              id="notTagged"
              placeholder="Not Tagged"
            />
          </div>

          <div className="inputbox">
            <label>Intitle</label>
            <input
              type="text"
              value={inTitle}
              onChange={(e) => setIntitle(e.target.value)}
              name="intitle"
              id="intitle"
              placeholder="intitle"
            />
          </div>

          <hr />
          <div className="btn-block">
            <button disabled={disabled} type="submit" href="/">
              Submit
            </button>
          </div>
          <hr />
        </form>
        <br />
      </div>
    </div>
  );
}

export default App;
