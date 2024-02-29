import { View, Text } from "react-native";

type RankIndicatorProps = {
    rank: number
}

function RankIndicator ({rank}: RankIndicatorProps) {
    return (
        <View 
            style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'black'
            }}
        >
            <Text 
                style={{
                    fontWeight: 'bold', 
                    color: 'white', 
                    fontSize: 24,
                    width: '70%',
                    textAlign: 'center'
                }}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
            >
                {rank}
            </Text>
        </View>
    );
}

export default RankIndicator;