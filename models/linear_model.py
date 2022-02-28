import tensorflow as tf

class LinearModel(tf.keras.Model):
	def __init__(self, num_units):
		super(LinearModel, self).__init__()
		self.units = num_units
		self.model = tf.keras.layers.Dense(units=self.units) 

	def call(self,x):
		y = self.model(x)
		return y