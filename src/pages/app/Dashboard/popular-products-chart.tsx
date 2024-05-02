import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import colors from 'tailwindcss/colors'

import {
    ResponsiveContainer,
    PieChart,
    CartesianGrid,
    Pie,
    Cell,
} from 'recharts'  
import { BarChart, LineChart } from 'lucide-react'

const COLORS = [
    colors.sky[500],
    colors.amber[500],
    colors.violet[500],
    colors.emerald[500],
    colors.rose[500],
]

const data = [
    {product: 'Pepperoni', amount: 40},
    {product: 'Mussarela', amount: 30},
    {product: 'Marguerita', amount: 50},
    {product: '4 queijos', amount: 20},
    {product: 'Frango com catupiry', amount: 26},
]

export function PopularProductsChart(){
    return(
        <Card className='col-span-3'>
            <CardHeader className='pb-8'>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        Produtor ppulares
                    </CardTitle>
                    <BarChart className='h-4 w-4 text-muted-foreground'/>
                </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart  style={{fontSize: 12}}>
                    <Pie 
                        data={data}
                        dataKey="amount"
                        nameKey="product"
                        cx="50%"
                        cy="50%"
                        outerRadius={86}
                        innerRadius={64}
                        strokeWidth={8}                    
                    >
                        {
                            data.map((_, index) => {
                                return <Cell key={`cell-${index}`} fill={COLORS[index]} className='stroke-background hover:opacity-80'/>
                            })
                        }
                    </Pie>
                </PieChart>   
              </ResponsiveContainer>  
            </CardContent>
        </Card>
    )
}