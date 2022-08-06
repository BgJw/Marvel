import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import MarvelService from '../../services/MarvelService';

import './SearchByName.scss';
import { getSingleCharByName } from '../../slices/CharListSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchByName = () => {
    
    const { getCharacterName } = MarvelService();
    const { singleChar } = useSelector(state => state.CharListSlice);
    const dispatch = useDispatch();

    
    const results = singleChar ?
    <div className="char__search-wrapper">
        <div className="char__search-success">There is! Visit {singleChar.name} page?</div>
        <Link to={`/characters/${singleChar.id}`} className="button button__secondary">
            <div className="inner">To page</div>
        </Link>
    </div> : 
    <div className="char__search-error">
        The character was not found. Check the name and try again
    </div>;
    
    return (
        
        <div className="char__search-form">
            <Formik
                initialValues={
                    { charName: '' }
                }
                validationSchema={
                    Yup.object({
                        charName: Yup.string().required('This field is required') 
                    })
                } 
                onSubmit = { values => {
                            getCharacterName(values.charName) 
                                .then(data => dispatch(getSingleCharByName(data)))
                                .catch( dispatch(getSingleCharByName('')));
                            }}>
                    { ({touched, values}) => (
                    <Form>
                        <label className="char__search-label" htmlFor="charName">Find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field
                                id="charName"
                                name='charName'
                                type='text'
                                placeholder="Enter name" />
                            <div>
                                <button
                                    type='submit'
                                    className="button button__main"
                                    disabled={ null }>
                                    <div className="inner">
                                        find
                                    </div>
                                </button>
                            </div>
                        </div>
                        {touched.charName && values.charName.length ? results: <ErrorMessage className='char__search-error' name='charName' component='p'/>}
                    </Form>
                    )}
            </Formik>
        </div>
    )
};

export default SearchByName;