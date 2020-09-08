import React, { useEffect, useState } from 'react';
import { Watches } from './Watches';
import { Form, Button, Col } from 'react-bootstrap';
import { Pages } from './Pagination';

function App() {
    const [watches, setWatches] = useState([]);
    const [images, setImages] = useState([]);
    const [order, setOrder] = useState(1);
    const [num_pages, setNum_pages] = useState(0);
    const [cur_page, setCur_page] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        fetch('/api/shop/' + order + '/' + cur_page)
        .then(response => response.json()
        .then(data => {
            setWatches(data.watches);
            setImages(data.images);
            setNum_pages(data.num_pages);
            setLoading(false);
        }))
    }, [order, cur_page]);

    const changeOrder = (val) => {
        setOrder(val);
    }
    const changePage = (val) => {
        if (val == "-1") {
            if ((cur_page - 1) > 0) {
            setCur_page(cur_page - 1)
            }
        }
        else if (val == "-2") setCur_page(cur_page + 1);
        else setCur_page(val);
        window.scrollTo(0, 0);
    }

    const Sorting = () => {
        return (
        <div className="my-3">
            {showMore ? null : (
                <Form.Group>
                    <Form.Row>
                        <Col>
                        <a className="text-secondary" href="mailto:ivan.kljun@navix.si"><i>Advertise at Watcho.com</i></a>
                        </Col>
                        <Col xs="auto" className="ml-auto ml-md-0 my-0">
                            <Form.Control size="sm" as="select" onChange={e => changeOrder(e.target.value)}>
                                <option value="1" >Newest ads first</option>
                                <option value="2" >Oldest ads first</option>
                                <option value="3" >Price ascending</option>
                                <option value="4" >Price descending</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>
            )}
        </div>
        )
    } 

    const More = () => {
        const onClick = () => {
            setShowMore(false);
            Sorting();
            window.scrollTo(0, 0);
        }
        return (
          <div className="d-flex justify-content-center">
            { showMore ? <Button className="text-center my-5" variant="secondary" onClick={onClick}>Show more »</Button> : 
            <Pages changePage={changePage} cur_page={cur_page} loading={loading} num_pages={num_pages}/> }
          </div>
        )
      }

    return (
        <div>
            <Sorting />
            <Watches watches={watches} images={images} loading={loading}/>
            <More />
        </div>
    );
}

export default App;