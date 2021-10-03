import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Alert, Linking } from 'react-native'
import { White } from '../../../Constants'
import Modal from 'react-native-modal'
import Input from '../../../resuseableComponents/generic/input'
import CustomButton from '../../../resuseableComponents/generic/button'
import jsonserver from '../../../api/server'

export default class RequestCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            emailForStripe: 'a@a.com',
            status: this.props.data.status == 'pending' ? 'Accept' : this.props.data.status == 'accepted' ? "Mark Complete" : "Completed",
        }

    }
    async acceptRequest() {

        // alert(this.state.status == "Accept" ? 'accepted' : this.state.status == 'Mark Complete' && "completed")
        try {
            const res = await jsonserver.put(`tailor/update_bidding_status/${this.props.data._id}`, {
                status: this.state.status == "Accept" ? 'accepted' : this.state.status == 'Mark Complete' && "completed",
                // card_number: this.state.cardNumber,
                // exp_month: this.state.EM,
                // exp_year: this.state.EY,
                // cvc: this.state.CVC
            })
            alert(JSON.stringify(res.data))
            if (this.state.status == "Mark Complete")
                this.setState({ status: "Completed" })
            if (this.state.status == "Accept")
                this.setState({ status: "Mark Complete" })
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }
    async creditCardInformation() {
        const res1 = await jsonserver.put(`tailor/stripe_account/${this.props.tailordata._id}`, {
            email: this.state.emailForStripe
        })
        if (res1.data.redirect) {
            // alert(res1.data.redirect)
            Linking.openURL(res1.data.redirect)
            this.toggleModal()
            this.acceptRequest()
            return
        }
        alert(JSON.stringify(res1.data))





    }

    toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    async cancelRequest() {

        const res = await jsonserver.put(`tailor/update_bidding_status/${this.props.data._id}`, {
            status: 'rejected'
        })
        if (res.data.success)
            this.setState({ cancel: 'Canceled' })
    }
    render() {
        var data = this.props.data
        return (
            <View style={{ width: '95%', backgroundColor: White, marginVertical: 10, borderWidth: 0.5 }}>
                {/* <Text>{JSON.stringify(this.props.tailordata)}</Text> */}
                <Modal isVisible={this.state.openModal} onBackdropPress={this.toggleModal.bind(this)}>
                    <View style={{ backgroundColor: White, paddingHorizontal: 10, paddingBottom: 20 }}>
                        <Text style={{ fontSize: 24 }}>Account Information before requesting</Text>
                        <Input placeholder="Enter Registred Email" onChangeText={(data) => this.setState({ emailForStripe: data })} style={{ width: '100%' }} />
                        {/* <Input placeholder="CVC" onChangeText={(data) => this.setState({ days: data })} style={{ width: '100%' }} type="numeric" /> */}
                        {/* <Input placeholder="Expiry Month" onChangeText={(data) => this.setState({ length: data })} style={{ width: '100%' }} />
          <Input placeholder="Expiry Year" onChangeText={(data) => this.setState({ length: data })} style={{ width: '100%' }} /> */}
                        <CustomButton buttontext="Submit" style={{ width: '100%' }} onPress={() => this.creditCardInformation(this)} />
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: data.user.profile_photo }} style={{ height: 100, width: 100 }} />
                    <View style={{ width: '55%', marginLeft: 10 }}>
                        <Text>{data.user.first_name} {data.user.last_name}</Text>
                        <Text>{data.user.address}</Text>
                        {
                            data.status != 'pending' &&
                            <>
                                <Text>{data.user.email}</Text>
                                <Text>{data.user.contact}</Text>
                            </>
                        }

                    </View>
                    {this.props.incomming ?
                        // <TouchableOpacity onPress={() => this.props.tailordata.stripe_account_id != '' ? this.acceptRequest() : this.setState({ openModal: !this.state.openModal })}>
                        <TouchableOpacity onPress={() => this.acceptRequest()}>

                            <Text style={{ color: 'blue' }}>
                                Accept
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity >

                            <Text style={{ color: 'red' }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}
