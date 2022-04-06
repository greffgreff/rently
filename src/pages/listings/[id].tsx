import Styling from './listingPage.module.css'
import Head from 'next/head'
import { Meta, NavigationBar, Map, Loading, Button, ButtonSecondary } from '../../components'
import { Listing, ProperAddress, Session, User } from '../../types'
import { deleteListing, fetchAddressTomTom, fetchListingById, fetchUserById } from '../../api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import jwt from 'jsonwebtoken'
import { AxiosError } from 'axios'

export default function ListingPage({ _jwt }) {
  const { data: session } = useSession()
  const [listing, setListing] = useState<Listing>(null)
  const [properAddress, setProperAddress] = useState<ProperAddress>(null)
  const [leaser, setLeaser] = useState<User>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchListingById(id.toString())
        .then(setListing)
        .catch((ex: AxiosError) => {
          router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.response?.data?.status)
        })
    }
  }, [id])

  useEffect(() => {
    if (listing) {
      fetchAddressTomTom(listing.address.country, listing.address.city, listing.address.zip, listing.address.street).then(setProperAddress).catch(console.log)
      fetchUserById(listing.leaser)
        .then(setLeaser)
        .catch((ex: AxiosError) => {
          router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.code)
        })
    }
  }, [listing])

  const showLeasePage = async () => {
    router.push('/lease?id=' + listing.id)
  }

  const deleteAd = async () => {
    await deleteListing(listing.id, _jwt)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>{listing?.name} | Rently.io</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        {listing ? (
          <>
            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <div className={Styling.descArea}>
                  <img className={Styling.image} src={listing.image} />

                  <div>
                    <div className={Styling.title}>{listing.name}</div>
                    <div className={Styling.details}>
                      <p>
                        <b>Daily price </b>
                        {listing.price}€
                      </p>
                      <p>
                        <b>Available since </b>
                        {listing.createdAt}
                      </p>
                    </div>

                    <div className={Styling.details}>
                      <h3>About this listing</h3>
                      <p>{listing.desc}</p>
                      <p>{listing.startDate}</p>
                      <p>{listing.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <h2>About the leaser</h2>
                <p>
                  <b>Name</b> {leaser?.name}
                </p>
                {leaser?.email ? (
                  <p>
                    <b>Email</b> {leaser.email}
                  </p>
                ) : null}
                {listing?.phone ? (
                  <p>
                    <b>Phone</b> {listing.phone}
                  </p>
                ) : null}
              </div>
            </div>

            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <h2>Where can I find this</h2>
                <p>{properAddress?.formatedAddress}</p>
                {properAddress ? <Map lat={properAddress.geocode.lat} lon={properAddress.geocode.lng} /> : null}
              </div>
            </div>

            {(session as Session)?.user?.id == listing.leaser ? (
              <div className={Styling.btns}>
                <div onClick={showLeasePage}>
                  <Button text="Change something" width="200px" />
                </div>
                <div onClick={deleteAd}>
                  <ButtonSecondary text="Remove this listing" width="200px" />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <Loading />
        )}
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const req = context.req
  const secret = process.env.JWT_SECRET
  const token: any = await getToken({ secret, req })

  let _jwt = null
  if (token) {
    const payload = {
      sub: token?.user.id,
      iat: token?.iat,
      exp: token?.exp,
      jti: token?.jti,
    }
    _jwt = jwt.sign(payload, secret, { algorithm: 'HS256' })
  }

  return { props: { _jwt } }
}
