import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { ALL_TIME_FIELDS } from "../../graphql/fragments";
import { ITime } from "../../interfaces/interfaces";

import Head from "next/head";
import Header from "../../components/Header/header";
import Card from "../../components/Card/card";
import Footer from "../../components/Footer/index";

interface  TimeProps {
    time: ITime
}

const TimeYear: React.FC<TimeProps> = ( {time} ) => {
    return <>
        <Head>
            <title> LIGHTFILMS : {time.id} </title>
        </Head>
        <Header />
        <div id="timeBlock">
            <section id="timeContent">
                <h2> {time.id}'s <br/> {time.title} </h2>
                {
                    time.sections.map( (section: any, i) => {
                        return <article key = {i}>
                            <h4> {section.title} </h4>
                            {
                                section.p.map( (p, j) => {
                                    return (
                                        <p key = {j}> {p} </p>
                                    )
                                } )
                            }
                        </article>
                    } )
                }
                <article>
                    <h4>SOME OF THE BEST MOVIES OF THE DECADE</h4>
                    <div id="bestMovies">
                        {
                            time.bestMovies.map( (film) => {
                                return <Card 
                                    HREF = "/film/[id]"
                                    AS = {`/film/${film.id}`}
                                    key = { film.id }

                                    h3 = {film.h3}
                                    h6top = {film.h6top}
                                    h6bot = {film.h6bot}
                                    img = {film.img}
                                    type = "single"
                                />
                            } )
                        }
                    </div>
                </article>
            </section>
        </div>
        <Footer />
    </>
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {

    if( process.env.MODE === "development" ) {
        try {

            const client = new ApolloClient({
                uri: process.env.DEV_GRAPHQL_SERVER,
                cache: new InMemoryCache()
            })
    
            const data = await client.query({
                query: gql`
                    query getTime {
                        getTime(id: ${ctx.params.id}) {
                            ...TimeFragment
                    }
                }
                ${ALL_TIME_FIELDS.fragment}
                `
            })
    
            return {
                props: {
                    time: data.data.getTime
                }
            }
        } catch(err) {
            console.log( `Err: ${err}` )
        }

    } else if( process.env.MODE === "production" ) {

        try {

            const res: Response = await fetch(`${process.env.PROD_JSON_SERVER}`)
            const data = await res.json()

            const time = await data.times.filter( (time) => {
                return time.id === ctx.params.id
            } )

            return {
                props: {
                    time: time[0]
                }
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }

    }

}

export const getStaticPaths: GetStaticPaths = async () => {

    if( process.env.MODE === "development" ) {
        try {
            
            const client = new ApolloClient({
                uri: process.env.DEV_GRAPHQL_SERVER,
                cache: new InMemoryCache()
            })

            const data = await client.query({
                query: gql`
                    query getAllTimes {
                        getAllTimes {
                            id
                    }
                }
                `
            })

            const paths = await data.data.getAllTimes.map( ( {id} ) => {
                return (
                    {
                        params: { id: id }
                    }
                )
            } )

            return { paths, fallback: false }

        } catch(err) {
            console.log( `Err: ${err}` )
        }
        
    } else if( process.env.MODE === "production" ) {

        try {
            const res: Response = await fetch(`${process.env.PROD_JSON_SERVER}`)
            const data = await res.json()
            const times = await data.times;
    
            const paths = times.map( (time) => {
                return (
                    {
                        params: { id: time.id }
                    }
                )
            } )
    
            return {
                paths,
                fallback: false
            }
        } catch(err) {
            console.log( `Err: ${err}` )
        }

    }

}

export default TimeYear;